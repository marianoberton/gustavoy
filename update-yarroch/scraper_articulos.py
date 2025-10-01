from playwright.sync_api import sync_playwright
import time
import json

def scrape_infobae_articles():
    base_url = "https://www.infobae.com/autor/gustavo-yarroch/"
    articles = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Configurar contexto con idioma español e ignorar errores SSL
        context = browser.new_context(
            locale='es-AR',  # Español de Argentina
            extra_http_headers={
                'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8'
            },
            ignore_https_errors=True  # Ignorar errores de certificado SSL
        )
        page = context.new_page()
        
        # Navegar a la página con un timeout mayor y esperar hasta que el DOM esté cargado
        page.goto(base_url, timeout=60000, wait_until="domcontentloaded")
        
        # Esperar a que se cargue el primer artículo
        page.wait_for_selector("a.feed-list-card", timeout=15000)
        
        # Mientras exista el botón "VER MÁS", hacer click para cargar más artículos.
        while True:
            try:
                button = page.query_selector("button.feed-list-read-more")
                if button:
                    button.click()
                    # Esperar un poco para que se carguen nuevos artículos
                    time.sleep(2)
                else:
                    break
            except Exception as e:
                print("Error al hacer click en 'VER MÁS':", e)
                break
        
        # Obtener todos los artículos de la lista
        article_elements = page.query_selector_all("a.feed-list-card")
        print(f"Se encontraron {len(article_elements)} artículos.")
        
        for art in article_elements:
            try:
                # Extraer URL (se concatena con la URL base si es relativa)
                href = art.get_attribute("href")
                url_article = href if href.startswith("http") else "https://www.infobae.com" + href
                
                # Extraer título desde el h2 dentro del artículo
                title_el = art.query_selector("h2.feed-list-card-headline-lean")
                title = title_el.inner_text().strip() if title_el else ""
                
                # Extraer descripción desde el h3
                desc_el = art.query_selector("h3.deck")
                description = desc_el.inner_text().strip() if desc_el else ""
                
                # Extraer imagen: buscar el <img> dentro de <picture>
                img_el = art.query_selector("picture img")
                image_src = img_el.get_attribute("src") if img_el else ""
                image_alt = img_el.get_attribute("alt") if img_el else ""
                
                # Extraer la fecha a partir de la URL
                # Ejemplo URL: https://www.infobae.com/deportes/2025/03/10/los-entretelones-de...
                parts = url_article.split('/')
                if len(parts) > 6:
                    year = parts[4]
                    month = parts[5]
                    day = parts[6]
                    fecha = f"{day}/{month}/{year}"
                else:
                    fecha = ""
                
                articles.append({
                    "title": title,
                    "description": description,
                    "url": url_article,
                    "image": {
                        "src": image_src,
                        "alt": image_alt
                    },
                    "fecha": fecha  # Campo fecha en formato DD/MM/AAAA
                })
            except Exception as ex:
                print("Error procesando un artículo:", ex)
                
        browser.close()
    
    # Asignar ID secuencial a cada artículo
    for idx, art in enumerate(articles, start=1):
        art["id"] = idx
        
    return articles

if __name__ == "__main__":
    articles_data = scrape_infobae_articles()
    output_file = "articles_with_ids.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(articles_data, f, indent=4, ensure_ascii=False)
    print(f"Se han scrapeado {len(articles_data)} artículos y se han guardado en {output_file}")
