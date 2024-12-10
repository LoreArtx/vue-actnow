import { fetchData } from "@/utils/api";
import { defineStore } from "pinia";

const useRequests = defineStore('requests',{
    state:()=>({requests:[], fetchInterval: null}),
    actions:{
        async fetchRequests(){
            if(this.requests.length > 0) return
                this.requests = await fetchData("http://localhost:5555/api/actnow/requests")
        },
        async initRequests(){
            await this.fetchRequests()
        },
        async getRequestById(id){
            let request = this.requests.find(r=>r._id === id)

            if(!request){
                return await fetchData(`http://localhost:5555/api/actnow/requests/${id}`)
            }

            return request
        },
        getRequestsByAuthor(author){
            let requests = this.requests.filter(r=>r.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()))
            return requests 
        },

        getRequestsByNeedTitle(need){
            let requests = this.requests.filter(r=>r.needs.some(n=>n.title.toLocaleLowerCase().includes(need.toLocaleLowerCase())))
            return requests
        },

        getRequestsByCategory(category){
            let requests = this.requests.filter(r=>r.category === category)
            return requests
        },
        
        // startFetchingRequests() {
        //     if (!this.fetchInterval) {
        //         this.fetchInterval = setInterval(async() => {
        //             console.log("refetch")
        //             await this.fetchRequests();
        //         }, 5000);
        //     }
        // },
        // stopFetchingRequests() {
        //     if (this.fetchInterval) {
        //         clearInterval(this.fetchInterval);
        //         this.fetchInterval = null;
        //     }
        // }
    }
})

export default useRequests