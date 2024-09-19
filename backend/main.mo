import Float "mo:base/Float";

import Debug "mo:base/Debug";

actor {
    public func add(x: Float, y: Float) : async Float {
        return x + y;
    };

    public func subtract(x: Float, y: Float) : async Float {
        return x - y;
    };

    public func multiply(x: Float, y: Float) : async Float {
        return x * y;
    };

    public func divide(x: Float, y: Float) : async ?Float {
        if (y == 0.0) {
            Debug.print("Division by zero error");
            return null;
        } else {
            return ?(x / y);
        };
    };
};
