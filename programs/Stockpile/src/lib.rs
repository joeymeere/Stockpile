/***
Copyright 2022 Stockpile,
www.twitter.com/GoStockpile
www.stockpile.pro

--MIT License--
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***/

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("7iApoMteJ7ANz4dpN5kM6LdGjNRcaieqzxPHD6cddFY4");

#[program]
pub mod stockpile {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        user_account.username = username;
        user_account.authority = authority.key();

        Ok(())
    }

    pub fn create_fundraiser(
        ctx: Context<CreateFundraiser>,
        name: String,
        description: String,
        image_link: String,
        website_link: String,
        contact_link: String,
    ) -> Result<()> {
        //Define beneficiary and fundraiser PDA
        let beneficiary = &mut ctx.accounts.beneficiary;
        let fundraiser = &mut ctx.accounts.fundraiser;
        let user_account = &mut ctx.accounts.user_account;

        //Define key values and vectors
        fundraiser.raised = 0;
        fundraiser.beneficiary = beneficiary.key();
        fundraiser.creator = user_account.username.to_string();
        fundraiser.name = name;
        fundraiser.description = description;
        fundraiser.image_link = image_link;
        fundraiser.contact_link = contact_link;
        fundraiser.website_link = website_link;

        Ok(())
    }

    pub fn contribute(ctx: Context<Contribute>, amount: u8) -> Result<()> {
        let fundraiser = &mut ctx.accounts.fundraiser;
        let contributor = &mut ctx.accounts.fundraiser;

        //Define simple transfer
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.contributor.to_account_info(),
                to: ctx.accounts.fundraiser.to_account_info(),
                authority: ctx.accounts.contributor.to_account_info(),
            },
        );

        //Define contribution info struct

        //transfer tokens to fundraiser PDA
        token::transfer(cpi_ctx, amount.into())
            .map_err(|err| println!("{:?}", err))
            .ok();

        //Push contribution information to vector

        //Update raised count
        ctx.accounts.fundraiser.raised += amount;

        Ok(())
    }

    pub fn fundraiser_withdraw(ctx: Context<FundraiserWithdraw>, amount: u8) -> Result<()> {
        //Define beneficiary and fundraiser PDA
        let fundraiser = &mut ctx.accounts.fundraiser;
        let beneficiary = &mut ctx.accounts.beneficiary;

        //PDA checks
        let (pda, bump) = Pubkey::find_program_address(
            &[b"fuckItWeBall!", &*beneficiary.key().as_ref()],
            &self::ID,
        );

        //Transfer from fundraiser PDA
        **fundraiser.to_account_info().try_borrow_mut_lamports()? -= amount as u64;
        **beneficiary.to_account_info().try_borrow_mut_lamports()? += amount as u64;

        Ok(())
    }

    // name: 4 + 256, desc: 4 + 256, contact_link: 4 + 1024, website_link: 4 + 2048, image_link: 4 + 2048, + 32 + 1

    #[derive(Accounts)]
    pub struct CreateUser<'info> {
        #[account(init,
            seeds = [b"fuckItWeBall!".as_ref(),
            authority.key().as_ref()],
            bump,
            payer = authority,
            space = 8 + 8 + 4 + 256,
        )]
        pub user_account: Account<'info, User>,
        #[account(mut)]
        pub authority: Signer<'info>,
        pub system_program: Program<'info, System>,
    }

    #[derive(Accounts)]
    #[instruction(name: String)]
    pub struct CreateFundraiser<'info> {
        #[account(init, 
        seeds = [name.as_ref(),
        beneficiary.key().as_ref()], 
        bump, 
        payer = beneficiary, 
        space = 8 + 32 + 4 + 100 + 4 + 1200 + 4 + 200 + 4 + 50 + 4 + 100 + 4 + 75 + 1 + 4042,
        )]
        pub fundraiser: Account<'info, Fundraiser>,
        #[account(mut)]
        pub user_account: Account<'info, User>,
        #[account(mut)]
        pub beneficiary: Signer<'info>,
        pub rent: Sysvar<'info, Rent>,
        pub system_program: Program<'info, System>,
    }

    #[derive(Accounts)]
    pub struct Contribute<'info> {
        #[account(mut)]
        pub fundraiser: Account<'info, Fundraiser>,
        #[account(mut)]
        pub contributor: Signer<'info>,
        /// CHECK:  This is not dangerous because we don't read or write from this account
        pub token_program: AccountInfo<'info>,
        pub system_program: Program<'info, System>,
    }

    #[derive(Accounts)]
    pub struct FundraiserWithdraw<'info> {
        #[account(mut, has_one = beneficiary)]
        pub fundraiser: Account<'info, Fundraiser>,
        #[account(mut)]
        pub beneficiary: Signer<'info>,
    }

    #[account]
    pub struct User {
        pub authority: Pubkey,
        pub username: String,
    }

    #[account]
    pub struct Fundraiser {
        pub beneficiary: Pubkey,
        pub creator: String,
        pub name: String,
        pub description: String,
        pub image_link: String,
        pub contact_link: String,
        pub website_link: String,
        pub raised: u8,
    }

    #[account]
    #[derive(Default)]
    pub struct Contributor {
        pub contributor: Pubkey,
        pub amount: u8,
        pub contribution_count: u8,
    }

    #[error_code]
    pub enum Errors {
        #[msg("The pubkey supplied is incorrect")]
        IncorrectPDAPubkey,
        #[msg("The bump supplied is incorrect")]
        IncorrectBump,
        #[msg("Fundraiser Name is too long")]
        NameTooLong,
        #[msg("Description is too long")]
        DescriptionTooLong,
    }
}
