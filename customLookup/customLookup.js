import { LightningElement } from 'lwc';
import searchAccounts from '@salesforce/apex/CustomLookupController.searchAccounts';

export default class CustomLookup extends LightningElement {
     searchTerm = '';
     searchResults = [];
     selectedRecord = null;
     errorMessage = '';

    handleSearch(event) {
        this.selectedRecord = null;
        this.searchTerm = event.target.value;
        if (this.searchTerm.length >= 2) {
            searchAccounts({ searchTerm: this.searchTerm })
                .then(result => {
                    this.searchResults = result;
                    if(this.searchResults.length === 0){
                        this.errorMessage = 'No Record Found';
                       
                    } else {
                        this.errorMessage = '';
                    }
                })
                .catch(error => {
                    this.searchResults = [];
                    this.errorMessage = 'No Record Found';
                    console.error('Error fetching records:', error);
                });
        } else {
            this.searchResults = [];
            this.errorMessage = '';
        }
    }

    handleSelect(event) {
        const selectedId = event.target.dataset.id;
        this.selectedRecord = this.searchResults.find(record => record.Id === selectedId);
        this.searchTerm = this.selectedRecord.Name;
        this.searchResults = [];
    }
}
