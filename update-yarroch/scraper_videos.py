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

def get_individual_video_info(video_id):
    """Obtiene información detallada de un video individual"""
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'no_warnings': True,
        'ignoreerrors': True,
        'socket_timeout': 30,
        'retries': 2,
        # Configuración para idioma español
        'writesubtitles': False,
        'writeautomaticsub': False,
        'subtitleslangs': ['es', 'es-ES', 'es-AR'],
        'geo_bypass': True,
        'geo_bypass_country': 'AR',  # Argentina
        'extractor_args': {
            'youtube': {
                'lang': ['es', 'es-ES', 'es-AR'],
                'player_client': ['android', 'web']
            }
        }
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            info = ydl.extract_info(video_url, download=False)
            
            return {
                'thumbnail': info.get('thumbnail', ''),
                'upload_date': info.get('upload_date', ''),
                'timestamp': info.get('timestamp'),
                'duration': info.get('duration'),
                'view_count': info.get('view_count'),
            }
    except Exception as e:
        print(f"Error obteniendo info detallada para {video_id}: {e}")
        return {}

def get_channel_videos_simple(url, max_videos=None):
    """Versión simplificada usando extract_flat para evitar problemas con YouTube"""
    # Configuración más simple y robusta con idioma español
    ydl_opts = {
        'extract_flat': True,  # Solo extraer metadatos básicos
        'quiet': False,  # Mostrar progreso
        'skip_download': True,
        'no_warnings': False,
        'ignoreerrors': True,
        'socket_timeout': 60,
        'retries': 5,
        # Configuración para idioma español
        'writesubtitles': False,
        'writeautomaticsub': False,
        'subtitleslangs': ['es', 'es-ES', 'es-AR'],
        'geo_bypass': True,
        'geo_bypass_country': 'AR',  # Argentina
        'extractor_args': {
            'youtube': {
                'lang': ['es', 'es-ES', 'es-AR'],
                'player_client': ['android', 'web']
            }
        }
    }
    
    # Solo agregar playlistend si max_videos está especificado
    if max_videos is not None:
        ydl_opts['playlistend'] = max_videos
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print("Extrayendo información básica del canal...")
            info = ydl.extract_info(url, download=False)
            videos = []
            
            # 'entries' contendrá la lista de videos
            entries = info.get('entries', [])
            print(f"Encontrados {len(entries)} videos en el canal.")
            
            for i, entry in enumerate(entries):
                if not entry or not entry.get('title') or not entry.get('id'):
                    continue
                
                # Con extract_flat=True, tenemos información limitada pero más estable
                video_id = entry.get('id')
                
                # Información básica del extract_flat
                video_data = {
                    'title': entry.get('title', ''),
                    'url': f"https://www.youtube.com/watch?v={video_id}" if video_id else '',
                    'thumbnail': entry.get('thumbnail', ''),
                    'upload_date': entry.get('upload_date', ''),
                    'upload_date_formatted': format_date(entry.get('upload_date')),
                    'timestamp': entry.get('timestamp'),
                    'duration': entry.get('duration'),
                    'view_count': entry.get('view_count'),
                    'id': video_id
                }
                
                # Si falta información crítica, intentar obtenerla individualmente
                if not video_data['thumbnail'] or not video_data['upload_date'] or not video_data['timestamp']:
                    print(f"Obteniendo información detallada para: {entry.get('title', 'Video sin título')[:50]}...")
                    detailed_info = get_individual_video_info(video_id)
                    
                    # Completar campos faltantes
                    if not video_data['thumbnail'] and detailed_info.get('thumbnail'):
                        video_data['thumbnail'] = detailed_info['thumbnail']
                    if not video_data['upload_date'] and detailed_info.get('upload_date'):
                        video_data['upload_date'] = detailed_info['upload_date']
                        video_data['upload_date_formatted'] = format_date(detailed_info['upload_date'])
                    if not video_data['timestamp'] and detailed_info.get('timestamp'):
                        video_data['timestamp'] = detailed_info['timestamp']
                    if not video_data['duration'] and detailed_info.get('duration'):
                        video_data['duration'] = detailed_info['duration']
                    if not video_data['view_count'] and detailed_info.get('view_count'):
                        video_data['view_count'] = detailed_info['view_count']
                
                videos.append(video_data)
                
                # Mostrar progreso cada 10 videos
                if (i + 1) % 10 == 0:
                    print(f"Procesados {i + 1} videos...")
                    
            return videos
            
    except Exception as e:
        print(f"Error al extraer videos: {e}")
        return []

def get_channel_videos_detailed(url, max_videos=None):
    """Versión que intenta obtener más detalles, pero puede fallar"""
    ydl_opts = {
        'extract_flat': False,
        'quiet': True,
        'skip_download': True,
        'writesubtitles': False,
        'writeautomaticsub': False,
        'ignoreerrors': True,
        'socket_timeout': 30,
        'retries': 3,
        # Configuración para idioma español
        'subtitleslangs': ['es', 'es-ES', 'es-AR'],
        'geo_bypass': True,
        'geo_bypass_country': 'AR',  # Argentina
        'extractor_args': {
            'youtube': {
                'lang': ['es', 'es-ES', 'es-AR'],
                'player_client': ['android', 'web']
            }
        }
    }
    
    if max_videos is not None:
        ydl_opts['playlistend'] = max_videos
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print("Extrayendo información detallada del canal...")
            info = ydl.extract_info(url, download=False)
            videos = []
            entries = info.get('entries', [])
            print(f"Procesando {len(entries)} videos...")
            
            for i, entry in enumerate(entries):
                if not entry or not entry.get('title') or not entry.get('id'):
                    continue
                    
                upload_date_raw = entry.get('upload_date')
                videos.append({
                    'title': entry.get('title'),
                    'url': f"https://www.youtube.com/watch?v={entry.get('id')}" if entry.get('id') else entry.get('url'),
                    'thumbnail': entry.get('thumbnail'),
                    'upload_date': upload_date_raw,
                    'upload_date_formatted': format_date(upload_date_raw),
                    'timestamp': entry.get('timestamp'),
                    'duration': entry.get('duration'),
                    'view_count': entry.get('view_count'),
                })
                
                if (i + 1) % 10 == 0:
                    print(f"Procesados {i + 1} videos...")
                    
            return videos
    except Exception as e:
        print(f"Error al extraer videos detallados: {e}")
        return []

if __name__ == '__main__':
    channel_url = "https://www.youtube.com/@gustavoyarroch/videos"
    
    print("Intentando extracción simple primero...")
    videos = get_channel_videos_simple(channel_url, max_videos=50)
    
    # Si la extracción simple no funciona o no da suficientes datos, intentar la detallada
    if not videos or len(videos) < 5:
        print("Extracción simple falló o dio pocos resultados. Intentando extracción detallada...")
        videos = get_channel_videos_detailed(channel_url, max_videos=30)
    
    if videos:
        # Guarda la salida en un archivo JSON
        with open('videos.json', 'w', encoding='utf-8') as f:
            json.dump(videos, f, indent=2, ensure_ascii=False)
            
        print(f"Archivo videos.json generado correctamente con {len(videos)} videos.")
    else:
        print("No se pudieron extraer videos del canal. Creando archivo vacío...")
        with open('videos.json', 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii=False)
        print("Archivo videos.json creado vacío.")
