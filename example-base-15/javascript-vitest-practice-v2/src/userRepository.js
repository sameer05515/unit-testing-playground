export class UserRepository{constructor(db){this.db=db}async findById(id){return this.db.findOne("users",{id})}async save(user){return this.db.insert("users",user)}}
