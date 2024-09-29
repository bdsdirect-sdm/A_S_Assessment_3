import { DataTypes, Model} from 'sequelize';
import sequelize from '../config/db';

// Define a type for the User attributes
interface UserAttributes {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    DOB: Date;
    gender: string;
    phone: string;
}


// Define the User model class extending Sequelize's Model class
class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public firstname! : string;
    public lastname! : string;
    public email!: string;
    public password!: string;
    public DOB!: Date;
    public gender!: string;
    public phone!: string;
    

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
    {
        firstname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DOB: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
