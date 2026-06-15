export interface SnowflakeItem {
  id: string;
  x: number;          // horizontal position offset % (0 - 100)
  size: number;       // medium size (e.g. 24 - 32px)
  delay: number;      // animation delay
  duration: number;   // fall duration
  wobble: number;     // sway offset
  opacity: number;
}

export interface BalloonItem {
  id: string;
  x: number;          // horizontal position offset % (0 - 100)
  size: number;       // medium size (e.g. 40 - 52px)
  color: string;      // Tailwind fill color / hex color
  delay: number;      // animation delay
  duration: number;   // float duration
  wobble: number;     // sway offset
  opacity: number;
}
