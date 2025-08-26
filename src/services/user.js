import api from "./api";
import { toast } from "react-toastify";

const userService = {
    async verifyPII(data) {
        await api.post('user-pii-check', data)
        .then(response => response.json())
        .then(result => console.log('PII Result: ', result))
        .catch(error => console.error('Error verifying PII:', error));
    },

    async checkUserStatus(status) {
      switch(status) {
        case 'Active':
          toast.error("You cannot signup again!")
          break;
        case 'Inactive':
          // Handle inactive status
          break;
        case 'New':
          toast.error("You cannot signup again!")
          break;
        case 'Closed':
          // Handle closed status
          break;
        case 'Archived':
          // Handle archived status
          break;
        case 'Paused by User':
          toast.warning("Your account is Paused")
          // Handle Paused By User
          break;
        case 'Paused for Payment Failure':
          toast.warning("Your must complete your payment details first!")
          break;
        case 'Banned':
          toast.error("You cannot signup again!")
          break;
        case 'Paused by System':
          toast.error("You cannot signup again!")
          break;
        default:
          console.log('Invalid Account Status')
          break;
      }
  },

    async verifyUserExistenceByEmail(email) {
        try {
            const response = await api.get(`user/${email}`);
            switch (response.status) {
                case 200:
                    console.log('User exists:', response.data);
                    toast.error('Email is already registered');
                    break;
                case 204:
                    console.log('User does not exist', response);
                    break;
                case 401:
                    console.log('User is not authorized');
                    toast.error('You are not authorized to access this resource');
                    break;
                default:
                    console.log('Unexpected response:', response);
            }
            return response;
        } catch (error) {
            console.error('Error verifying user:', error);
            throw error;
        }
    },

    async registerNewUser(data){
        await api.post('user', data)
        .then(response => {
            console.log('User registered successfully:', response.data);
            toast.success('Registration successful');
        })
        .catch(error => {
            console.error('Error registering user:', error);
            toast.error('Registration failed');
        });
    },

    async updateUserStatus(externalId){
        await api.patch(`user/${externalId}/active`)
        .then(response => {
            console.log('User status updated successfully:', response.data);
            toast.success('User status updated successfully');
        })
        .catch(error => {
            console.error('Error updating user status:', error);
            toast.error('Failed to update user status');
        });
    }
}

export default userService;