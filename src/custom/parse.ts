export interface IChunkCustom {
  name: string; // 客户
  join: Date; // 加入事件
  buyCount: number; // 累计购买笔数
  buyAmount: number; // 累计购买金额
  area: string;
}
export function toChunkCustom(chunk: string[]): IChunkCustom {
  const [name, join, buyCount, buyAmount, area] = chunk;
  return {
    name,
    join: new Date(join),
    buyCount: Number(buyCount),
    buyAmount: Number(buyAmount),
    area,
  }
}
