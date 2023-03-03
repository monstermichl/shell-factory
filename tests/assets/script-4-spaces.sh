#!/bin/sh
func1() {
    echo "First level Function"
    func2() {
        echo "Second level Function"
        func3() {
            echo "Third level Function"
        }
    }
}
if [ 1 -eq 1 ]; then
    echo "First level If"
    if [ 2 -eq 2 ]; then
        echo "Second level If"
        if [ 3 -eq 3 ]; then
            echo "Third level If"
        fi
    fi
fi
while [ $i -gt 0 ]; do
    echo "First level While"
    while [ $i -gt 1 ]; do
        echo "Second level While"
        while [ $i -gt 0 ]; do
            echo "Third level While"
            break
        done
        break
    done
    break
done
for i in 1 2 3; do
    echo "First level For ($i)"
    for j in 1 2 3; do
        echo "Second level For ($j)"
        for k in 1 2 3; do
            echo "Third level For ($k)"
        done
    done
done
case $input in
    1)
        echo "First level Case"
        ;;
    *)
        case $input in
            2)
                echo "Second level Case"
                ;;
            *)
                case $input in
                    *)
                        echo "Third level Case"
                        ;;
                esac
                ;;
        esac
        ;;
esac
