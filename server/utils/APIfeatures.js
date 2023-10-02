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

        // console.log(queryCopy)
        this.query = this.query.find(queryCopy)
        return this
    }
}

module.exports = ApiFeatures;