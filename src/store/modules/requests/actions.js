export default {
        async contactCoach(context, payload) {
                console.log(payload)
                const newRequest = {
                  userEmail: payload.userEmail,
                  message: payload.message,
                };
              const response = await  fetch(`https://coachfinder-236e3-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
                        method: 'POST',
                        body:JSON.stringify(newRequest)
              });
                if (!response.ok) {
                        const error = new Error(response.message || 'Something Went Wrong');
                        throw error;
                }
                const responseData = await response.json();
                newRequest.id = responseData.name;
                newRequest.coachId = payload.coachId
                context.commit("addRequest", newRequest);
        },
        async fetchRequests(context) {
                const userId = context.rootGetters.userId;
                const token = context.rootGetters.token
                const response = await fetch(`https://coachfinder-236e3-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`);
                const responseData = response.json();
                if (!response.ok) {
                          const error = new Error(
                            response.message || "Failed to fetch Request"
                          );
                          throw error;
                }
                const requests = [];
                for (const key in responseData) {
                        const request = {
                                id: key,
                                coachId: coachId,
                                userEmail: responseData[key].userEmail,
                                message: responseData[key].message
                        };
                        requests.push(request)
                }
                context.commit("setRequests",requests);
        }
}