module.exports = {
    stories: ['../stories/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-vite',
        options: {}
    },
    features: {
        postcss: false
    },
    docs: {
        autodocs: false
    }
};
