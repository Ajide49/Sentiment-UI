import {Directive, HostBinding, Self} from '@angular/core';
import {NgControl} from '@angular/forms';


/** Validation directive to add bootstrap style on fields when validation fails
 * 
 */
@Directive({
    selector: '[validationStyle]'
    
})
export class BootstrapValidatorDirective {
    constructor(@Self() private cd: NgControl) {}

    @HostBinding('class.is-invalid')
    get isInvalid(): boolean {
        const control = this.cd.control;
        return control ? control.invalid && control.dirty : false;
    }

    @HostBinding('class.is-valid')
    get isValid(): boolean {
        const control = this.cd.control;
        return control ? !control.invalid && control.dirty : false;
    }

}