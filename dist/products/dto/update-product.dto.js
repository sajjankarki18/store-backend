"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_dto_1 = require("../../categories/dto/create-category.dto");
class UpdateProductDto extends (0, mapped_types_1.PartialType)(create_category_dto_1.CreateCategoryDto) {
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=update-product.dto.js.map