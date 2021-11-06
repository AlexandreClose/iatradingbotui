import axios from "./axios";

export default
{
    async login( username, password )
    {
        return axios.post('/login?username='+username+'&password='+password, null, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        })
    },

    async get_strategies( )
    {
        return axios.get('/strategy_manager/', {
            withCredentials: true,
        }).then( response => {
            return response.data
        })
    },

    async unregister_strategy_by_id ( strategy )
    {
        console.log( strategy.id )
        return axios.post('/strategy_manager/unregister_by_id/?id='+strategy.id, null,{
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        }, {}).then( response => {
            return response.data
        })
    },

    async register_strategy ( strategy )
    {
        return axios.post('/strategy_manager/register/?symbol='+strategy.symbol+'&n_currencies='+strategy.n_currencies+'&strategy_type='+strategy.strategy_type+'&optimize='+strategy.optimize, {strategy:strategy},{
            withCredentials: true,
        }, {}).then( response => {
            return response.data.strategy
        })
    }


}