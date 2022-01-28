<script lang="ts">
    import CreateAccount from './operations/CreateAccount.svelte';
    import Payment from './operations/Payment.svelte';
    import { useParams } from 'svelte-navigator';

    let component;

    const urlParams = useParams();

    switch ($urlParams['operation']) {
        case 'payment':
            component = Payment;
            break;
        case 'createAccount':
            component = CreateAccount;
            break;
        default:
            component;
    }
</script>

<svelte:component this="{component}" />
