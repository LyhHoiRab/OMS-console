const host = 'http://localhost:8080';

//数据字典
export const RSAPublicKey        = host + '/api/1.0/key/rsa/public';
export const ProductTypeSelect   = host + '/api/1.0/const/productType';
export const CustomizedSelect    = host + '/api/1.0/const/customized';
export const AccountStatusSelect = host + '/api/1.0/const/accountStatus';
export const SexSelect           = host + '/api/1.0/const/sex';
export const UsingStateSelect    = host + '/api/1.0/const/usingStatus';

//商品模块
export const ItemPageList       = host + '/api/1.0/item/page';
export const ItemUpdateIsCheck  = host + '/api/1.0/item/isCheck';
export const ItemUpdateStock    = host + '/api/1.0/item/stock';
export const ItemExportTemplate = host + '/api/1.0/item/export/template';
export const ItemImportTemplate = host + '/api/1.0/item/upload';

//产品模块
export const ProductGetById           = host + '/api/1.0/product/{id}';
export const ProductUpdate            = host + '/api/1.0/product';
export const ProductUploadCertificate = host + '/api/1.0/product/upload/certificate';
export const ProductUploadThumbnail   = host + '/api/1.0/product/upload/thumbnail';

//微信号模块
export const WechatPageList    = host + '/api/1.0/wxInfo/page';
export const WechatUploadImage = host + '/api/1.0/wxInfo/upload/image';
export const WechatUploadQr    = host + '/api/1.0/wxInfo/upload/qr';
export const WechatSave        = host + '/api/1.0/wxInfo';
export const WechatUpdate      = host + '/api/1.0/wxInfo';
export const WechatGetById     = host + '/api/1.0/wxInfo/{id}';

//销售模块
export const SalesPageList       = host + '/api/1.0/sales/page';
export const SalesUpdateStatus   = host + '/api/1.0/sales/status';
export const SalesGetByAccountId = host + '/api/1.0/sales/{accountId}';
export const SalesSave           = host + '/api/1.0/sales';
export const SalesUpdate         = host + '/api/1.0/sales';

//角色模块
export const RolePageList = host + '/api/1.0/role/page';

//功能模块
export const FunctionPageList = host + '/api/1.0/function/page';

//支付方式模块
export const PaymentPageList = host + '/api/1.0/payment/page';
export const PaymentGetById  = host + '/api/1.0/payment/{id}';
export const PaymentSave     = host + '/api/1.0/payment';
export const PaymentUpdate   = host + '/api/1.0/payment';