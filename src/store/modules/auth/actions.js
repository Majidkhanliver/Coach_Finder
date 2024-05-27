export default {
        async login(context, payload) {
                context.dispatch('auth', { ...payload, mode: "Login" })
        },
        async auth(context, payload) {
                debugger
                let _url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD23B3RHO4_ILRqE6WirAiS1C0zDa8MgaU"
                if (payload.mode !== "Login") {
                  _url =
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD23B3RHO4_ILRqE6WirAiS1C0zDa8MgaU";
                }
                const response = await fetch(_url,
                        {
                                method: "POST",
                                body: JSON.stringify({
                                        email: payload.email,
                                        password: payload.password,
                                        returnSecureToken: true,
                                }),
                        }
                );
                const responseData = await response.json();
                console.log(responseData);
                if (!response.ok) {
                        const error = new Error(response.message || "Failed to authenticate");
                        throw error;
                }
                const obj = {
                  token: responseData.idToken,
                  userId: responseData.localId,
                  tokenExpiration: responseData.expireIn,
                };
                context.commit("setUser", obj);
                localStorage.setItem('userInfo',JSON.stringify(obj))
        },
  async signup(context, payload) {
                context.dispatch('auth',
                        {
                                ...payload,
                                mode: "SignUp"
                        }
                )
        },
        logout(context, payload) {
                context.commit("setUser", {
                        token: null,
                        userId: null,
                        tokenExpiration: null,
                });
        },
        autoLogin(context, payload) {
                debugger
                let item = localStorage.getItem('userInfo')
                if (item) {
                        const obj = JSON.parse(item);
                         context.commit("setUser", {
                           token: obj.token,
                           userId: obj.userId,
                           tokenExpiration: null,
                         });
                }
                
        }
};
