import { validateEmail } from './utils';
import { validatePhone } from './utils';
new Vue({
    el: '#form',
    vuetify: new Vuetify(),
    data: {
        search: '',
        FullName: '',
        Email: '',
        Comments: '',
        headers: [
            { text: 'First Name', value: 'firstname', align: 'start', sortable: true },
            { text: 'Last Name', value: 'lastname', sortable: true },
            { text: 'State', value: 'state', sortable: true },
            { text: 'City', value: 'city', sortable: true },
            { text: 'Zip', value: 'zip', sortable: true },
            { text: 'Address', value: 'address', sortable: true },
            { text: 'Phone', value: 'phone', sortable: true },
            { text: 'Email', value: 'email', sortable: true },
        ],
        contacts: [],
        editedIndex: -1,
        editedItem: {
            firstname: '',
            lastname: '',
            state: '',
            city: '',
            zip: '',
            address: '',
            phone: '',
            email: ''
        },
        defaultItem: {
            firstname: '',
            lastname: '',
            state: '',
            city: '',
            zip: '',
            address: '',
            phone: '',
            email: ''
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        isSubmitDisabled() {
            let isDisabled = true;

            if (this.comments !== []) {
                isDisabled = false;
            }

            return isDisabled;
        },
        methods: {
            ResetForm() {
                this.comments = [];
            },

            SubmitForm() {
                let submit = true;

                if (!validateEmail(this.email)) {
                    this.InvalidEmail = true;
                    submit = false;
                } else {
                    this.InvalidEmail = false;
                }

                if (!validatePhone(this.phone)) {
                    this.InvalidPhone = true;
                    submit = false;
                } else {
                    this.InvalidPhone = false;
                }

                if (submit) {
                    axios({
                        method: 'post',
                        url: '/Home/SubmittedForm',
                        data: { "Fields": this.$data }
                    }).then(res => {
                        alert('Successfully submitted new contact');
                        this.$refs.SubmitButton.setAttribute("disabled", "disabled");
                    }).catch(err => {
                        alert(`There was an error submitting your form. See details: ${err}`);
                    });
                }
            },

            editItem(item) {
                this.editedIndex = this.contacts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.contacts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                this.contacts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.contacts[this.editedIndex], this.editedItem)
                } else {
                    this.contacts.push(this.editedItem)
                }
                this.SubmitForm()
                this.close()
            },
            initialize() {
                //InitializeTable()

                axios({
                    method: 'post',
                    url: '/Home/SubmittedForm'
                }).then(res => {
                    //Fills contacts with contacts JSON 
                    this.contacts = res.$data
                }).catch(err => {
                    alert(`There was an error submitting your form. See details: ${err}`);
                    //Provide dummy data on error
                    this.contacts = [
                        {
                            firstname: 'Test',
                            lastname: 'Test',
                            state: 'TE',
                            city: 'Testville',
                            zip: '90210',
                            address: '123 Test St',
                            phone: '(800)867-5309',
                            email: 'test@test.com'
                        }]
                });

            }
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.initialize()
    },
});