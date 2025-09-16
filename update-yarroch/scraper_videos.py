import yt_dlp
import json
from datetime import datetime

def format_date(upload_date):
    """Convierte fecha YYYYMMDD a formato legible"""
    if upload_date:
        try:
            date_obj = datetime.strptime(upload_date, '%Y%m%d')
            return date_obj.strftime('%d/%m/%Y')
        except:
            return upload_date
    return None

def get_channel_videos(url, max_videos=None):
    # Configuración para extraer la lista sin descargar los videos
    ydl_opts = {
        'extract_flat': False,  # Cambiado a False para obtener más metadatos incluyendo fechas
        'quiet': True,
        'skip_download': True,
        'writesubtitles': False,
        'writeautomaticsub': False,
        'geo_bypass': True,
        'ignoreerrors': True,  # Ignorar errores de videos individuales
        'extractor_args': {
            'youtube': {
                'lang': ['es', 'es-ES'],  # Preferir español
                'skip': ['hls', 'dash']
            }
        },
        'http_headers': {
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
        }
    }
    
    # Solo agregar playlistend si max_videos está especificado
    if max_videos is not None:
        ydl_opts['playlistend'] = max_videos
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        videos = []
        # 'entries' contendrá la lista de videos (si no, es un solo video)
        for entry in info.get('entries', []):
            # Saltar videos que no tienen información completa o están no disponibles
            if not entry or not entry.get('title') or not entry.get('id'):
                continue
                
            upload_date_raw = entry.get('upload_date')
            videos.append({
                'title': entry.get('title'),
                'url': f"https://www.youtube.com/watch?v={entry.get('id')}" if entry.get('id') else entry.get('url'),
                'thumbnail': entry.get('thumbnail'),
                'upload_date': upload_date_raw,           # Fecha original YYYYMMDD
                'upload_date_formatted': format_date(upload_date_raw),  # Fecha formateada DD/MM/YYYY
                'timestamp': entry.get('timestamp'),      # Timestamp Unix
                'duration': entry.get('duration'),        # Duración en segundos
                'view_count': entry.get('view_count'),    # Número de visualizaciones
            })
        return videos

if __name__ == '__main__':
    # URL del canal (la misma que la de la sección de videos)
    channel_url = "https://www.youtube.com/@gustavoyarroch/videos"
    
    # Limitamos a 100 videos para evitar errores con videos no disponibles
    print("Generando archivo de videos (máximo 100)...")
    videos = get_channel_videos(channel_url, max_videos=100)  # Máximo 100 videos
    
    # Guarda la salida en un archivo JSON
    with open('videos.json', 'w', encoding='utf-8') as f:
        json.dump(videos, f, indent=2, ensure_ascii=False)
        
    print("Archivo videos.json generado correctamente.")
