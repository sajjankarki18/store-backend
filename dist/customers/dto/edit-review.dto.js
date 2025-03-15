"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const add_review_dto_1 = require("./add-review.dto");
class EditReviewDto extends (0, swagger_1.PartialType)(add_review_dto_1.AddReviewDto) {
}
exports.EditReviewDto = EditReviewDto;
//# sourceMappingURL=edit-review.dto.js.map