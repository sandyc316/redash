
function normalizeNumericValue(value, defaultValue = null) {
    const result = parseFloat(value);
    return isFinite(result) ? result : defaultValue;
}

function isDateParameter(paramType) {
    return true;
    // return includes(['date', 'datetime-local', 'datetime-with-seconds'], paramType);
}

function isDateRangeParameter(paramType) {
    return true;
    // return includes(['date-range', 'datetime-range', 'datetime-range-with-seconds'], paramType);
}

const DATETIME_FORMATS = {
    'date': 'YYYY-MM-DD',
    'date-range': 'YYYY-MM-DD',
    'datetime-local': 'YYYY-MM-DD HH:mm',
    'datetime-range': 'YYYY-MM-DD HH:mm',
    'datetime-with-seconds': 'YYYY-MM-DD HH:mm:ss',
    'datetime-range-with-seconds': 'YYYY-MM-DD HH:mm:ss',
};

class Parameter {
    title: string;
    name: string;
    type: string;
    useCurrentDateTime: any;
    global: any;
    enumOptions: any;
    queryId: any;
    value: any;
    $$value: any;

    constructor(parameter) {
        this.title = parameter.title;
        this.name = parameter.name;
        this.type = parameter.type;
        this.useCurrentDateTime = parameter.useCurrentDateTime;
        this.global = parameter.global;
        this.enumOptions = parameter.enumOptions;
        this.queryId = parameter.queryId;

        // validate value and init internal state
        this.setValue(parameter.value);
    }

    clone() {
        return new Parameter(this);
    }

    isEmpty() {
        return this.getValue() ? false : true;
    }

    getValue() {
        // const isEmptyValue = isNull(this.value) || isUndefined(this.value) || (this.value === '');
        
        // if (!this.value) {
        //     if (includes(['date', 'datetime-local', 'datetime-with-seconds'], this.type) &&
        //         this.useCurrentDateTime
        //     ) {
        //         return moment().format(DATETIME_FORMATS[this.type]);
        //     }

        //     return null; // normalize empty value
        // }
        if (this.type === 'number') {
            return normalizeNumericValue(this.value, null); // normalize empty value
        }

        return this.value;
    }

    setValue(value) {
        if (isDateRangeParameter(this.type)) {
            this.value = null;
            this.$$value = null;

            // if (isObject(value) && !isArray(value)) {
            //     value = [value.start, value.end];
            // }

            // if (isArray(value) && (value.length === 2)) {
            //     value = [moment(value[0]), moment(value[1])];
                
            //     if (value[0].isValid() && value[1].isValid()) {
                    
            //         this.value = {
            //             start: value[0].format(DATETIME_FORMATS[this.type]),
            //             end: value[1].format(DATETIME_FORMATS[this.type]),
            //         };
                    
            //         this.$$value = value;
            //     }
            // }
        } else if (isDateParameter(this.type)) {
            this.value = null;
            this.$$value = null;

            // value = moment(value);
            if (value.isValid()) {
                this.value = value.format(DATETIME_FORMATS[this.type]);
                this.$$value = value;
            }
        } else if (this.type === 'number') {
            this.value = value;
            this.$$value = normalizeNumericValue(value, null);
        } else {
            this.value = value;
            this.$$value = value;
        }
    }

    normalizedValue() {
        return this.$$value;
    }

    // TODO: Remove this property when finally moved to React
    getngModel() {
        return this.normalizedValue;
    }
    
    setngModel(value) {
        this.setValue(value);
    }

    toUrlParams() {
        if (this.isEmpty) {
            return {};
        }
        if (isDateRangeParameter(this.type)) {
            return {
            [`p_${this.name}.start`]: this.value.start,
            [`p_${this.name}.end`]: this.value.end,
            };
        }

        return {
            [`p_${this.name}`]: this.value,
        };
    }

    fromUrlParams(query) {
        // if (isDateRangeParameter(this.type)) {
        //     const keyStart = `p_${this.name}.start`;
        //     const keyEnd = `p_${this.name}.end`;
            
        //     if (has(query, keyStart) && has(query, keyEnd)) {
        //         this.setValue([query[keyStart], query[keyEnd]]);
        //     }
        // } else {
        //     const key = `p_${this.name}`;
        
        //     if (has(query, key)) {
        //         this.setValue(query[key]);
        //     }
        // }
    }

    toQueryTextFragment() {
        if (isDateRangeParameter(this.type)) {
            return `{{ ${this.name}.start }} {{ ${this.name}.end }}`;
        }

        return `{{ ${this.name} }}`;
    }
}

