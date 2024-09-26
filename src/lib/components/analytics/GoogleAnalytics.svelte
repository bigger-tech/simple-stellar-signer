<script lang="ts" context="module">
    declare let gtag: (...args: any[]) => void;
</script>

<script lang="ts">
    import { onMount } from 'svelte';

    import { GOOGLE_ANALYTICS_ID } from '../../../constants';

    onMount(() => {
        const script = document.createElement('script');
        script.id = 'google-analytics-script';
        script.innerHTML = `
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `;

        document.head.appendChild(script);
    });

    $: {
        if (typeof gtag !== 'undefined') {
            gtag('config', GOOGLE_ANALYTICS_ID, {
                page_title: document.title,
                page_path: window.location.pathname,
            });
        }
    }
</script>

<svelte:head>
    <script async id="google-analytics" src="https://www.googletagmanager.com/gtag/js?id={GOOGLE_ANALYTICS_ID}">
    </script>
</svelte:head>
