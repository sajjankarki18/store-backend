"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBannerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_banner_dto_1 = require("./create-banner.dto");
class UpdateBannerDto extends (0, mapped_types_1.PartialType)(create_banner_dto_1.CreateBannerDto) {
}
exports.UpdateBannerDto = UpdateBannerDto;
//# sourceMappingURL=update-banner.dto.js.map