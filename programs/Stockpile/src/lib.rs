use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("FnkM2vCShr2iRZ91eTej5oAHAJhYmeJ8urysfZGM5DaB");

const STRING_LEN: usize = 100;

#[program]
pub mod stockpile {
    use super::*;

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

        //Define key values and vectors
        fundraiser.raised = 0;
        fundraiser.name = name;
        fundraiser.description = description;
        fundraiser.image_link = image_link;
        fundraiser.contact_link = contact_link;
        fundraiser.website_link = website_link;

        Ok(())
    }

    pub fn contribute(ctx: Context<Contribute>, amount: u8) -> Result<()> {
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

    pub fn fundraiser_withdraw(
        ctx: Context<FundraiserWithdraw>,
        amount: u8,
        fundraiser_bump: u8,
    ) -> Result<()> {
        //Define beneficiary and fundraiser PDA
        let fundraiser = &mut ctx.accounts.fundraiser;
        let beneficiary = &mut ctx.accounts.beneficiary;

        //PDA checks
        let (pda, bump) = Pubkey::find_program_address(
            &[b"fuckItWeBall!", &*beneficiary.key().as_ref()],
            &self::ID,
        );

        //     if pda != beneficiary.key() {
        //         return Err(Errors::IncorrectPDAPubkey.into());
        //     };

        //     if bump != fundraiser_bump {
        //         return Err(Errors::IncorrectBump.into());
        //     };

        //Transfer from fundraiser PDA
        **fundraiser.to_account_info().try_borrow_mut_lamports()? -= amount as u64;
        **beneficiary.to_account_info().try_borrow_mut_lamports()? += amount as u64;

        Ok(())
    }
    // name: 4 + 256, desc: 4 + 256, contact_link: 4 + 1024, website_link: 4 + 2048, image_link: 4 + 2048, + 32 + 1
    #[derive(Accounts)]
    #[instruction(name: String)]
    pub struct CreateFundraiser<'info> {
        #[account(init_if_needed, 
        seeds = [name.as_ref(),
        beneficiary.key().as_ref()], 
        bump, 
        payer = beneficiary, 
        space = 8 + 8 + 6144,
        )]
        pub fundraiser: Account<'info, Fundraiser>,
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
    #[derive(Default)]
    pub struct Fundraiser {
        pub beneficiary: Pubkey,
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
