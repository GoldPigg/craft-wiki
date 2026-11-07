<template>
    <div class="rod-container">
        <div class="rod-ball"></div>
        <div class="rod"></div>
        <div class="rod-ball"></div>
    </div>
</template>

<style scoped>
.rod-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: relative;
}

.rod-ball {
    content: '';
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 35% 35%, #e8c25a, #b8860b 45%, #6b4f08);
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.rod {
    width: 100%;
    height: 18px;
    background: linear-gradient(180deg, #5a4632 0%, #3d2e1f 50%, #2a1f15 100%);
    border-radius: 9px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
    position: relative;
    z-index: 2;
    flex-shrink: 1;
}
</style>