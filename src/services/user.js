import { toast } from "react-toastify";


const userService = {
  async verifyPII(data) {
    try {
      const response = await fetch('/api/post-data?endpoint=user-pii-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {

      if (error.response?.status === 409) {
        toast.error("We found an account associated with this information. Please Sign In!");
      }

      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }

      if (error.response?.status === 500) {
        toast.error("It looks like your email is already in use. Please try to login!");
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
    switch (status) {
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
        break;
      case 'Archived':
        toast.error("You cannot signup again!")
        break;
      case 'Paused by User':
        toast.warning("Your account is Paused")
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
      const response = await fetch(`/api/fetch-data?endpoint=user/${email}`);
      // api.get(`v2/user/${email}`);
      switch (response.status) {
        case 200:
          if (type === 'signup') {
            toast.error('Email is already registered, Please Sign In to your account');
          } else {
            toast.success('Login Successful');
          }
          break;
        case 204:
          if (type === 'login') {
            toast.error('Account not found, Please Sign Up');
          }
          break;
        case 401:
          toast.error('You are not authorized to access this resource');
          break;
      }
      return response;
    } catch (error) {
      console.error('ERR_USER_VERFICATION:', error);
      throw error;
    }
  },

  async registerNewUser(data) {
    try {
      const response = await fetch('/api/post-data?endpoint=user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        toast.success('Registration successful');
      }
      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else if (error.response?.status == 500) {
        toast.error('An account is already associated with this email.');
      } else if (error.response?.status == 400) {
        toast.error('Invalid Data');
      } else if (error.response?.status == 409) {
        toast.error('It seems this information is already in use, please try to login.');
      }
      throw error;
    }
  },

  async updateUserStatus(externalId) {
    await fetch(`/api/patch-data?endpoint=user/${externalId}/active`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
        toast.success('User status updated successfully');
        return response;
      })
      .catch(error => {
        toast.error('Failed to update user status');
        return error;
      });
  },

  async updateUserProfile(apiInstance, data) {
    try {
      const response = await apiInstance.patch(`v1/profile`, data);
      if (response.status === 200) {
        toast.success('Your changes have been saved successfully!');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else if (error.response?.status === 400) {
        toast.error('Invalid Data. Please check your input and try again.');
      } else if (error.response?.status === 401) {
        toast.error('You are not authorized to perform this action. Please log in and try again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to update this profile.');
      } else if (error.response?.status === 500) {
        toast.error('Your changes could not be saved. Please try again later.');
      }
      console.error('Error updating user profile:', error);
    }
  },

  async updateUserPhysicalActivity(apiInstance, data) {
    console.log('Updating physical activity with data:', data);
    try {
      const response = await apiInstance.put(`v1/physical-activity`, data);
      if (response.status === 200) {
        toast.success('Your changes have been saved successfully!');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else if (error.response?.status === 400) {
        toast.error('Invalid Data. Please check your input and try again.');
      } else if (error.response?.status === 401) {
        toast.error('You are not authorized to perform this action. Please log in and try again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to update this profile.');
      } else if (error.response?.status === 404) {
        toast.error('Profile not found.');
      } else if (error.response?.status === 500) {
        toast.error('Your changes could not be saved. Please try again later.');
      }
      console.error('Error updating user physical activity:', error);
    }
  },

  async updateUserMiscData(apiInstance, miscType, data) {
    console.log(`Updating user misc data for ${miscType} with data:`, data);
    try {
      const response = await apiInstance.put(`v1/misc/${miscType}`, data);
      if (response.status === 200) {
        toast.success('Your changes have been saved successfully!');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout')) {
        toast.error('Request timed out. Please try again.');
      } else if (error.response?.status === 400) {
        console.error('Error updating user misc data:', error);
        toast.error('Invalid Data. Please check your input and try again.');
      } else if (error.response?.status === 401) {
        toast.error('You are not authorized to perform this action. Please log in and try again.');
      } else if (error.response?.status === 403) {
        toast.error('You do not have permission to update this profile.');
      } else if (error.response?.status === 404) {
        toast.error('Profile not found.');
      } else if (error.response?.status === 500) {
        toast.error('Your changes could not be saved. Please try again later.');
      }
    }
  },

  async getUserProfileImages(apiInstance) {
    try {
      const response = await apiInstance.get('v1/profile-images');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile images:', error);
      throw error;
    }
  }
}

export default userService;