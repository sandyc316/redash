import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



function orderedInputs(properties, order) {
    const inputs = new Array(order.length);
    
    Object.keys(properties).forEach((key) => {
        const position = order.indexOf(key);
        const input = { name: key, property: properties[key] };
        
        if (position > -1) {
            inputs[position] = input;
        } else {
            inputs.push(input);
        }
    });
    
    return inputs;
}

function normalizeSchema(configurationSchema) {
    console.log("configurationSchema in dynamic forms is ", configurationSchema.properties);
    for (const key in configurationSchema.properties) {
        // console.log(key);
        let prop = configurationSchema.properties[key];
        // console.log(prop);
        if (prop['name'] === 'password' || prop['name'] === 'passwd') {
            prop.type = 'password';
        }

        // if (prop['name'].endsWith('File')) {
        //     prop.type = 'file';
        // }

        if (prop['type'] === 'boolean') {
            prop['type'] = 'checkbox';
        }

        prop.required = configurationSchema.required.includes(prop['name']);
    }

    configurationSchema.order = configurationSchema.order || [];
}

function setDefaults(configurationSchema, options) {
    if (Object.keys(options).length === 0) {
        const properties = configurationSchema.properties;
        
        Object.keys(properties).forEach((property) => {
            
            if (!(properties[property].default)) {
                options[property] = properties[property].default;
            }
        });
    }
}


@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {
    @Input() target: any;
    @Input() type: any;
    @Input() actions: any;
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    inProgressActions: any = {};
    fields: any;

    constructor() {
    }

    ngOnInit() {
        const configurationSchema = this.type.configuration_schema;
        normalizeSchema(configurationSchema);
        this.fields = orderedInputs(configurationSchema.properties, configurationSchema.order);
        setDefaults(configurationSchema, this.target.options);

        // console.log(this.target.options);

        // if (this.actions) {
        //     this.actions.forEach((action) => {
        //         const originalCallback = action.callback;
        //         const name = action.name;
                
        //         action.callback = () => {
        //             action.name = '<i class="zmdi zmdi-spinner zmdi-hc-spin"></i> ${name}';

        //             this.inProgressActions[action.name] = true;
                    
        //             function release() {
        //                 this.inProgressActions[action.name] = false;
        //                 action.name = name;
        //             }

        //             originalCallback(release);
        //         };
        //     });
        // }
    }

    onBtnClick(btnName) {
        this.onClick.emit(btnName);
    }

    saveChanges() {
        console.log(this.onClick);
        console.log(this.target.options);
        // this.onClick.emit(this.target.options);
        // console.log(this.target);
        // this.target.save().subscribe((resp) => {
        //     console.log(resp);
         

        // }, (err) => {
        //     console.log("Error saving ", err);
        // });
        // this.target.save(
        //     () => {
        //         console.log("Successfully saved changes in DynamicForm ");
        //         // toastr.success('Saved.');
        //         // this.dynamicForm.$setPristine();
        //     }, (error) => {
        //         if (error.status === 400 && 'message' in error.data) {
        //             console.log("Error saving changes in DynamicForm ", error.data.message);
        //             // toastr.error(error.data.message);
        //         } else {
        //             console.log("Failed to save in DynamicForm ");
        //             // toastr.error('Failed saving.');
        //         }
        //     }
        // );
    }
}