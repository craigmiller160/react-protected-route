interface Spec {
    name: string;
}

describe('First test', () => {
    it('runs', () => {
        const spec: Spec = {
            name: 'foo'
        };
        console.log(spec);
    });
});
