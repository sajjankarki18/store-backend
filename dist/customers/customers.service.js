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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const customer_repository_1 = require("./repositories/customer.repository");
const customerReview_entity_1 = require("./entities/customerReview.entity");
const customerReview_repository_1 = require("./repositories/customerReview.repository");
let CustomerService = class CustomerService {
    constructor(customerRepository, customerReviewRepository) {
        this.customerRepository = customerRepository;
        this.customerReviewRepository = customerReviewRepository;
    }
    async getAllCustomerReviews() {
        const reviews = await this.customerReviewRepository.find();
        return { data: reviews };
    }
    async addReview(req, addReview) {
        try {
            const customer = req.user.sub;
            console.log(customer);
            const customerReview = this.customerReviewRepository.create({
                customer_id: customer,
                review: addReview.review,
                ratings: addReview.ratings,
            });
            return await this.customerReviewRepository.save(customerReview);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['Some error has been occured, while adding review!', error],
                error: 'Internal Server Error',
            });
        }
    }
    async updateReview(id, editReview) {
        const review = await this.customerReviewRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!review) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['Review not found!'],
                error: 'Not Found',
            });
        }
        try {
            await this.customerReviewRepository.update({ id }, {
                review: editReview.review,
                ratings: editReview.ratings,
            });
            return await this.customerReviewRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured, while deleting review!', error],
                error: 'Internal Server Error',
            });
        }
    }
    async deleteReview(id) {
        const review = await this.customerReviewRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!review) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['Review not found!'],
                error: 'Not Found',
            });
        }
        try {
            await this.customerReviewRepository.delete(id);
            return { id: `${id}`, message: `review has been deleted!` };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured, while deleting review!', error],
                error: 'Internal Server Error',
            });
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(customerReview_entity_1.CustomerReview)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        customerReview_repository_1.CustomerRviewRepository])
], CustomerService);
//# sourceMappingURL=customers.service.js.map