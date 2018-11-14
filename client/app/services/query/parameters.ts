
// function collectParams(parts) {
//     let parameters = [];

//     parts.forEach((part) => {
//         if (part[0] === 'name' || part[0] === '&') {
//             parameters.push(part[1].split('.')[0]);
//         } else if (part[0] === '#') {
//             parameters = union(parameters, collectParams(part[4]));
//         }
//     });

//     return parameters;
// }


// class Parameters {
    
//     constructor(query, queryString) {
//         this.query = query;
//         this.updateParameters();
//         this.initFromQueryString(queryString);
//     }

//     parseQuery() {
//         let parameters = [];
        
//         try {
//             const parts = Mustache.parse(this.query.query);
//             parameters = uniq(collectParams(parts));
//         } catch (e) {
//             logger('Failed parsing parameters: ', e);
//             // Return current parameters so we don't reset the list
//             parameters = map(this.query.options.parameters, i => i.name);
//         }

//         return parameters;
//     }

//     updateParameters() {
//         if (this.query.query === this.cachedQueryText) {
//             return;
//         }

//         this.cachedQueryText = this.query.query;
//         const parameterNames = this.parseQuery();

//         this.query.options.parameters = this.query.options.parameters || [];

//         const parametersMap = {};
//         this.query.options.parameters.forEach((param) => {
//             parametersMap[param.name] = param;
//         });

//         parameterNames.forEach((param) => {
//             if (!has(parametersMap, param)) {
//                 this.query.options.parameters.push(new Parameter({
//                     title: param,
//                     name: param,
//                     type: 'text',
//                     value: null,
//                     global: false,
//                 }));
//             }
//         });

//         const parameterExists = p => includes(parameterNames, p.name);
//         this.query.options.parameters = this.query.options.parameters.filter(parameterExists).map(p => new Parameter(p));
//     }

//     initFromQueryString(query) {
//         this.get().forEach((param) => {
//             param.fromUrlParams(query);
//         });
//     }

//     get() {
//         this.updateParameters();
        
//         return this.query.options.parameters;
//     }

//     add(parameterDef) {
//         this.query.options.parameters = this.query.options.parameters.filter(p => p.name !== parameterDef.name);
        
//         const param = new Parameter(parameterDef);
//         this.query.options.parameters.push(param);
    
//         return param;
//     }

//     getMissing() {
//         return map(filter(this.get(), p => p.isEmpty), i => i.title);
//     }

//     isRequired() {
//         return !isEmpty(this.get());
//     }

//     getValues() {
//         const params = this.get();
//         return zipObject(map(params, i => i.name), map(params, i => i.getValue()));
//     }
// }

