export type Token = {
  type: "text" | "gradient" | "color"
  raw: string
  inner: string
  params?: string
  start: number
  end: number
}
