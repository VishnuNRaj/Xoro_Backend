import * as CategoryEntity from "../../../entities/RequestInterface/AdminInterface"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../../entities/ResponseInterface/AdminResponseInterface"
import * as ResponseFunctions from "../../responses/AdminResponse"
import CategoryModel from "../../../frameworks/database/models/Category"
import { CategoryInterface } from "../../../entities/ModelsInterface/Category";

export const addCategory: Function = async ({ AdminId, Name }: CategoryEntity.addCategory): Promise<Responses.addCategoryResponse> => {
    try {
        const value = await DatabaseFunctions.findOneData(CategoryModel, { Name: Name })
        if (value) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Category Already Exists",
            status: 201
        })
        const [response]: CategoryInterface[] = await DatabaseFunctions.insertData(CategoryModel, <CategoryInterface>{ Name, CreatedBy: AdminId, CreatedAt: new Date() })
        return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            Category: response,
            message: "Category Added Successfully",
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Internal Server Error",
            status: 500
        })
    }
}

export const editCategory: Function = async ({ AdminId, Name, CategoryId }: CategoryEntity.editCategory): Promise<Responses.addCategoryResponse> => {
    try {
        const ctgry: CategoryInterface = await DatabaseFunctions.findUsingId(CategoryModel, CategoryId)
        if (!ctgry) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "No Category Found",
            status: 201
        })
        if (ctgry.CreatedBy !== AdminId) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Cannot Edit Category Created by Other",
            status: 201
        })
        const value = await DatabaseFunctions.findOneData(CategoryModel, { Name: Name, _id: ctgry._id })
        if (value) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Category Already Exists",
            status: 201
        })
        const response: CategoryInterface = await DatabaseFunctions.updateById(CategoryModel, ctgry._id, { Name: Name })
        return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            Category: response,
            message: "Category Edited Successfully",
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Internal Server Error",
            status: 500
        })
    }
}

export const deleteCategory: Function = async ({ AdminId, CategoryId }: CategoryEntity.editCategory): Promise<Responses.deleteCategoryResponse> => {
    try {
        const ctgry: CategoryInterface = await DatabaseFunctions.findUsingId(CategoryModel, CategoryId)
        if (!ctgry) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "No Category Found",
            status: 201
        })
        if (ctgry.CreatedBy !== AdminId) return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Cannot Edit Category Created by Other",
            status: 201
        })
        await ctgry.deleteOne()
        return ResponseFunctions.addCategoryRes(<Responses.deleteCategoryResponse>{
            CategoryId: CategoryId,
            message: "Category Edited Successfully",
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.addCategoryRes(<Responses.addCategoryResponse>{
            message: "Internal Server Error",
            status: 500
        })
    }
}

export const getCategory: Function = async (search: string, skip: number): Promise<Responses.getCategoryResponse> => {
    try {
        const category = await DatabaseFunctions.getCategory(search.length > 1 ? search : null, skip)
        return {
            Category: category,
            message: "Found",
            status: 200
        }
    } catch (e) {
        console.log(e)
        return {
            Category: [],
            message: "Error",
            status: 200
        }
    }
}