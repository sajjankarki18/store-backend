"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const add_review_dto_1 = require("./dto/add-review.dto");
const edit_review_dto_1 = require("./dto/edit-review.dto");
const swagger_1 = require("@nestjs/swagger");
let CustomersController = class CustomersController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    getAllCustomerReviews() {
        return this.customerService.getAllCustomerReviews();
    }
    addReview(req, addReview) {
        return this.customerService.addReview(req, addReview);
    }
    updateReview(id, editReview) {
        return this.customerService.updateReview(id, editReview);
    }
    deleteReview(id) {
        return this.customerService.deleteReview(id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Fetch all reviews!' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reviews cannot be fetched!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid review' }),
    (0, common_1.Get)('/all-reviews'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "getAllCustomerReviews", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: ' Add a review!' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Review has been added sucessfully!',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid review' }),
    (0, common_1.Post)('/review'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_review_dto_1.AddReviewDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "addReview", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_review_dto_1.EditReviewDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "deleteReview", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, common_1.Controller)('/customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomerService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map