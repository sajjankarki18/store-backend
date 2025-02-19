"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductPricingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_productPricing_dto_1 = require("./create-productPricing.dto");
class UpdateProductPricingDto extends (0, mapped_types_1.PartialType)(create_productPricing_dto_1.CreateProductPricingDto) {
}
exports.UpdateProductPricingDto = UpdateProductPricingDto;
//# sourceMappingURL=update-productPricing.dto.js.map