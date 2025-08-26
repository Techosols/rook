import api from "./api";
import { toast } from "react-toastify";


const userService = {
  async verifyPII(data) {
    try {
      const response = await api.post('user-pii-check', data);
      return response;
    } catch (error) {

      if(error.status === 409) {
        toast.error("We found an account associated with this information. Please Sign In!");
      }

      if(error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }

      if(error.status === 500) {
        toast.error("Internal Server Error, Please try again later!");
      }

      // Show validation errors from API response
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(key => {
          errors[key].forEach(msg => toast.error(msg));
        });
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Error verifying PII');
      }

      throw error;
    }
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
          toast.error("You cannot signup again!")
          // Handle closed status
          break;
        case 'Archived':
          toast.error("You cannot signup again!")
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
          toast.error('Invalid Account Status')
          break;
      }
  },

    async verifyUserExistenceByEmail(email, type = 'signup') {
        try {
            const response = await api.get(`user/${email}`);
            switch (response.status) {
                case 200:
                    console.log('User exists:', response.data);
                    if (type === 'signup') {
                        toast.error('Email is already registered, Please Sign In');
                    } else {
                        toast.success('Login Successful');
                    }
                    break;
                case 204:
                    console.log('User does not exist', response);
                    if(type === 'login') {
                        toast.error('Account not found, Please Sign Up');
                    }
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
          if(response.status === 201) {
            toast.success('Registration successful');
          }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            if(error.status == 500){
                toast.error('Internal Server Error, Please try again later!');
            } else if(error.status == 400) {
                toast.error('Invalid Data');
            } else if(error.status == 409) {
                toast.error('It seems this information is already in use, please try to login.');
            }
        });
    },

    async updateUserStatus(externalId){
        await api.patch(`user/${externalId}/active`)
        .then(response => {
            toast.success('User status updated successfully');
            return response;
        })
        .catch(error => {
            toast.error('Failed to update user status');
            return error;
        });
    }
}

export default userService;