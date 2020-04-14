export interface IChunkAgent {
  name: string; // 代理商
  cellphone: string; // 手机号
  join: Date; // 加入时间
  prod_combo: string; // 当前产品组合
  level: string; // 当前等级
  balance: number; // 收入余额
  draw: number; // 提现中
  unbalance: number; // 待结算收益
  goodsMony: number; // 货款余额
  achievement: number; // 总业绩
  sales: number; // 小店总销售
  parentName: string; // 进货上级
  parentCellphone: string; // 进货上级手机号码
  childCount: number; // 出货下级
  team: number; // 出货团队
  inviterName: string; // 邀请人
  inviterCellphone: string; // 邀请人手机号码
  inviterChild: number; // 邀请下级
  inviterTeam: number; // 邀请团队
  status: string; // 状态
  remark: string; // 备注
  idCard: string; // 身份证
  wxNum: string; // 微信号
  country: string; //国家
  province: string; // 省份
  city: string; // 城市
  district: string; // 区
}
export function toChunkAgent(chunk: string[]): IChunkAgent {
  const [
    name, cellphone, join, prod_combo, level,
    balance, draw, unbalance, goodsMony,
    achievement, sales,
    parentName, parentCellphone,
    childCount, team,
    inviterName,
    inviterCellphone,
    inviterChild,
    inviterTeam,
    status, remark,
    idCard, wxNum,
    country, province, city, district
  ] = chunk;
  return {
    name, cellphone, join: new Date(join), prod_combo, level,
    balance: Number(balance), draw: Number(draw), unbalance: Number(unbalance), goodsMony: Number(goodsMony),
    achievement: Number(achievement), sales: Number(sales),
    parentName, parentCellphone,
    childCount: Number(childCount), team: Number(team),
    inviterName,
    inviterCellphone,
    inviterChild: Number(inviterChild),
    inviterTeam: Number(inviterTeam),
    status, remark,
    idCard, wxNum,
    country, province, city, district
  }
}
