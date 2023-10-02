class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    SearchFeature() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i',
            }
        } : {};

        // console.log(keyword)
        this.query = this.query.find({ ...keyword });
        return this;
    }

    FilterFeature() {
        const queryCopy = { ...this.queryStr }

        // Removing some fiedls for category
        // console.log(queryCopy)

        const removefields = ["keyword", "page", "limit"]

        removefields.forEach((key => delete queryCopy[key]))

        //Filtering Price and rating
        // console.log(queryCopy)

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryStr)

        return this;
    }

    Pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;      //50- 10 

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }
}

module.exports = ApiFeatures;