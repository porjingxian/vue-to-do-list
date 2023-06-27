import AssignmentsList from "./AssignmentsList.js";
import AssignmentCreate from "./AssignmentCreate.js";
export default{
    components: {AssignmentsList, AssignmentCreate},

    template: `
    <section class="flex gap-8">
        <assignments-list :assignments="filters.inProgress" title="In Progress">
            <assignment-create @add="add"></assignment-create>
        </assignments-list>
        <div v-show="showCompleted">
            <assignments-list :assignments="filters.completed" title="Completed" can-toggle @toggle="showCompleted = ! showCompleted"></assignments-list>
        </div>
    </section>
    `,

    data(){
        return{
            assignments:[],
            showCompleted: true
        }
    },

    computed: {
        filters(){
                return{
                    inProgress: this.assignments.filter(assignment=>! assignment.complete),
                    completed: this.assignments.filter(assignment=>assignment.complete)
                };
            }
        },

    created(){
        fetch('http://localhost:3000/assignments')
            .then(response => response.json())
            .then(assignments => {
                this.assignments = assignments;
            });
    },

    methods:{
        add(name){
            this.assignments.push({
                name: name,
                completed: false,
                id: this.assignments.length + 1
            });
        }
    }
}