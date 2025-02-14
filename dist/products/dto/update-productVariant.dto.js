"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductVariantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_productVariant_dto_1 = require("./create-productVariant.dto");
class UpdateProductVariantDto extends (0, mapped_types_1.PartialType)(create_productVariant_dto_1.CreateProductVariantDto) {
}
exports.UpdateProductVariantDto = UpdateProductVariantDto;
//# sourceMappingURL=update-productVariant.dto.js.map