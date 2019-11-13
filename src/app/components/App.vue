<template>
    <div>
        <nav class="navbar navbar-light bg-light"> 
            <a href="/" class="navbar-brand">Home-Banking</a>
        </nav>
        <div class="container">
            <div class="row pt-5" style="margin-left: 100px">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="register">
                                <div class="form-group">
                                    <input type="text" v-model="user.dni"
                                    placeholder="Insert your dni"
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="user.username"
                                    placeholder="Insert your username"
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="user.email"
                                    placeholder="Insert your email"
                                    class="form-control">
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="user.password"
                                    placeholder="Insert your password"
                                    class="form-control">
                                </div>
                                <button class="btn btn-primary btn-block">SingUp</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user of users">
                                <td>{{user.username}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    class User {
        constructor(dni, email, username, password) {
            this.dni = dni;
            this.email = email;
            this.username = username;
            this.password = password;
        }
    }
    export default {
        data() {
            return {
                user: new User(),
                users: []
            }
        },
        created() {
            this.getUsers();
        },
        methods: {
            register() {
                fetch('/api/user/register', {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getUsers();
                })
                .catch(err => console.log(err));
                this.user = new User();
            },
            getUsers() {
                fetch('/api/user')
                    .then(res => res.json())
                    .then(data => {
                        this.users = data;
                        console.log(this.users);
                    });
            }
        }
}
</script>