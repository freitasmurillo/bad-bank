import bcrypt from 'bcryptjs';
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from '../../entity/User';
import { RegisterInput } from '../user/register/RegisterInput';
import { BankAccount } from '../../entity/BankAccount';
import { isAuthenticated } from '../middleware/isAuthenticated';

@Resolver()
export class BankAccountResolver {
    @UseMiddleware(isAuthenticated)
    @Query(() => BankAccount, { nullable: true })
    async bankAccount(
        @Arg('bankAccountId') bankAccountId: string
    ): Promise<BankAccount | null> {
        return BankAccount.findOne(bankAccountId as any);
    }

    @Mutation(() => BankAccount)
    async bankAccountCreation(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<BankAccount> {
        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User
            .create({
                firstName,
                lastName,
                email,
                password: hashedPass,
                confirmed: true,
            })
            .save();

        return BankAccount
            .create({ userId: user.id })
            .save();
    }
}
