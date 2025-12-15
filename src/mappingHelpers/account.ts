import { Address, BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";

export function getOrCreateAccount(address: Address, event: ethereum.Event): Account {
    let account = Account.load(address);

    if (!account) {
        account = new Account(address);

        account.creationBlockNumber = event.block.number;
        account.address = address;
        account.baseBorrowBalance = BigDecimal.zero();

        account.save();
    }

    return account;
}
