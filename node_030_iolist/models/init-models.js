import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_depts from "./tbl_depts.js";
import _tbl_iolist from "./tbl_iolist.js";
import _tbl_members from "./tbl_members.js";
import _tbl_product from "./tbl_product.js";

export default function initModels(sequelize) {
  const tbl_depts = _tbl_depts.init(sequelize, DataTypes);
  const tbl_iolist = _tbl_iolist.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_product = _tbl_product.init(sequelize, DataTypes);

  tbl_iolist.belongsTo(tbl_depts, { as: "IO_거래처", foreignKey: "io_dcode" });
  tbl_depts.hasMany(tbl_iolist, { as: "tbl_iolists", foreignKey: "io_dcode" });
  tbl_iolist.belongsTo(tbl_product, { as: "IO_상품", foreignKey: "io_pcode" });
  tbl_product.hasMany(tbl_iolist, { as: "IOS", foreignKey: "io_pcode" });

  return {
    tbl_depts,
    tbl_iolist,
    tbl_members,
    tbl_product,
  };
}
