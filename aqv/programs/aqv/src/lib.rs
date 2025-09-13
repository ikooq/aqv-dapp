use anchor_lang::prelude::*;

declare_id!("AQV111111111111111111111111111111111111111");

#[program]
pub mod aqv {
    use super::*;

    pub fn initialize_global(ctx: Context<InitializeGlobal>, fee_bps: u16) -> Result<()> {
        let state = &mut ctx.accounts.global_state;
        state.admin = *ctx.accounts.admin.key;
        state.fee_bps = fee_bps;
        state.paused = false;
        Ok(())
    }

    pub fn create_vault(ctx: Context<CreateVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.base_mint = ctx.accounts.base_mint.key();
        vault.vtoken_mint = ctx.accounts.vtoken_mint.key();
        vault.tvl = 0;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        // пока просто обновляем TVL
        let vault = &mut ctx.accounts.vault;
        vault.tvl += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        require!(vault.tvl >= amount, ErrorCode::InsufficientFunds);
        vault.tvl -= amount;
        Ok(())
    }

    pub fn harvest_and_compound(ctx: Context<HarvestAndCompound>) -> Result<()> {
        msg!("Compounding rewards... (stub)");
        Ok(())
    }
}

#[account]
pub struct GlobalState {
    pub admin: Pubkey,
    pub fee_bps: u16,
    pub paused: bool,
}

#[account]
pub struct Vault {
    pub base_mint: Pubkey,
    pub vtoken_mint: Pubkey,
    pub tvl: u64,
}

#[derive(Accounts)]
pub struct InitializeGlobal<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 2 + 1)]
    pub global_state: Account<'info, GlobalState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateVault<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 32 + 8)]
    pub vault: Account<'info, Vault>,
    pub base_mint: AccountInfo<'info>,
    pub vtoken_mint: AccountInfo<'info>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct HarvestAndCompound<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Insufficient funds in vault")]
    InsufficientFunds,
}
