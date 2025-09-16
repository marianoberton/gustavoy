import config from '../config.json';

// Variable para almacenar el tiempo de inicio de la simulación
let simulationStartTime: number | null = null;
let simulationBaseTime: number | null = null;

// Función para obtener la fecha actual o simulada
export function getCurrentDate(): Date {
  if (config.simulatedDate.enabled) {
    // Parsear la fecha usando la función parseDate para manejar formato DD/MM/YYYY
    const simulatedDate = parseDate(config.simulatedDate.date);
    if (!simulatedDate) {
      console.error('Error parsing simulated date:', config.simulatedDate.date);
      return new Date();
    }
    
    // Agregar la hora
    const [hours, minutes, seconds] = config.simulatedDate.time.split(':').map(Number);
    simulatedDate.setHours(hours, minutes, seconds || 0);
    
    // Si es la primera vez que se llama, establecer el tiempo base
    if (simulationStartTime === null) {
      simulationStartTime = Date.now();
      simulationBaseTime = simulatedDate.getTime();
    }
    
    // Calcular el tiempo transcurrido desde el inicio de la simulación
    const elapsedTime = Date.now() - simulationStartTime;
    
    // Retornar la fecha simulada más el tiempo transcurrido
    return new Date(simulationBaseTime + elapsedTime);
  }
  
  // Resetear variables de simulación si no está habilitada
  simulationStartTime = null;
  simulationBaseTime = null;
  
  return new Date();
}

// Función para parsear fecha en formato DD/MM/YYYY
export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  // Manejar formato DD/MM/YYYY
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Los meses en JS van de 0-11
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  
  // Intentar parsear como fecha ISO o formato estándar
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// Función para filtrar contenido por fechas recientes
export function filterByRecentDates<T extends { fecha?: string; upload_date_formatted?: string }>(
  items: T[],
  daysFromToday: number = config.dateFiltering.daysFromToday
): T[] {
  if (!config.dateFiltering.enabled) {
    return items;
  }

  const currentDate = getCurrentDate();
  const cutoffDate = new Date(currentDate);
  cutoffDate.setDate(cutoffDate.getDate() - daysFromToday);

  return items.filter(item => {
    const dateString = item.fecha || item.upload_date_formatted;
    if (!dateString) return false;
    
    const itemDate = parseDate(dateString);
    if (!itemDate) return false;
    
    // El video debe estar entre la fecha de corte y la fecha actual (simulada)
    // No debe ser posterior a la fecha actual simulada
    return itemDate >= cutoffDate && itemDate <= currentDate;
  });
}

// Función para ordenar por fecha (más recientes primero)
export function sortByDateDesc<T extends { fecha?: string; upload_date_formatted?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = parseDate(a.fecha || a.upload_date_formatted || '');
    const dateB = parseDate(b.fecha || b.upload_date_formatted || '');
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    return dateB.getTime() - dateA.getTime();
  });
}

// Función para obtener elementos recientes y ordenados
export function getRecentItems<T extends { fecha?: string; upload_date_formatted?: string }>(
  items: T[],
  maxItems?: number
): T[] {
  const filtered = filterByRecentDates(items);
  const sorted = sortByDateDesc(filtered);
  
  if (maxItems) {
    return sorted.slice(0, maxItems);
  }
  
  return sorted;
}