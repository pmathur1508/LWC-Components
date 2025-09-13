import { LightningElement, track } from 'lwc';

export default class LoanEmiCalculator extends LightningElement {
    @track loanAmount = null;
    @track interestRate = null;
    @track durationInput = null ;
    @track _duration = null ;
    @track validationMessage = '';
    @track showResult = false;

    handleLoanAmountChange(event){
        this.loanAmount = Number(event.target.value);
        this.resetValidation();
    }

    handleInterestChange(event){
        let val = event.target.value;
        if (val) {
            this.interestRate = parseFloat(Number(val).toFixed(2));
        } else {
            this.interestRate = null;
        }
        this.resetValidation();
    }

    handleDurationChange(event){
        this.durationInput = Number(event.target.value);
        this.resetValidation();
    }

    handleSubmit(){
        if(!this.loanAmount || !this.interestRate || !this.durationInput){
            this.validationMessage = '⚠️ Please fill all fields before calculating EMI !!';
            this.showResult = true;
            
            return;
        }

        this.duration = this.durationInput;
        this.durationInput = this._duration;
        this.showResult = true;
    }

    resetValidation(){
        this.showResult = false;
        this.validationMessage = '';
    }
    handleReset(){
        this.loanAmount = null;
        this.interestRate = null;
        this.durationInput = null;
        this._duration = null;
        this.validationMessage = '';
        this.showResult = false;
    }

    set duration(value){
        if(value<6){
            this.validationMessage = '⛔ Duration cannot be less than 6 months. Defaulted to 6';
            this._duration = 6;
        }
        else if(value>360){
            this.validationMessage = '⛔ Duration cannot be more than 30 years / 360 months. Defaulted to 360';
            this._duration = 360;
        }
        else{
            this._duration = value;
        }
    }

    get emi(){
        if(!this.loanAmount || !this.interestRate || !this._duration){
            return 0;
        }
        let principal = this.loanAmount;
        let r = this.interestRate /100/12;
        let n = this._duration;

        let emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    }

    get duration(){
        return this._duration;
    }
}