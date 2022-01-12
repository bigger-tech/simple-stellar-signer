<script>
    import { url, isActive } from '@roxi/routify';
    const links = [
        ['/shows', 'Recommended shows'],
        ['/contact', 'Contact'],
    ];
</script>

<header>
    <nav>
        <h1>
            <a href="/">Show Geek</a>
        </h1>
        <ul>
            {#each links as [path, name]}
                <li>
                    <a href="{$url(path)}" class:active="{$isActive(path)}">{name}</a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<style>
    .active {
        border-bottom: 3px solid var(--color-secondary);
    }
</style>
