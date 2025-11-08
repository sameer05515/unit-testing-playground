export const messages = Array.from({ length: 500 }, (_, idx) => ({
    id: `msg-${idx + 1}`,
    content: `${idx + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
}));
