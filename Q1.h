
#include <list>
#include <string.h>
#include "Student.h"

using namespace std;

template <class E>
class Map {
	class Entry {
	public:
		const char* key;
		E value;
		Entry(const char* k, const E& val) :key(k), value(val) {}
	};

	list<Entry> data;
public:
	void put(const char* key, const E& value) {
        auto it = index.find(key);
        if (it != index.end()) {
            // Key exists, update the value and move it to the front
            it->second->value = value;
            data.splice(data.begin(), data, it->second);
        } else {
            // Key does not exist, insert a new entry at the front
            data.push_front({ key, value });
            index[key] = data.begin();
        }
	}

    E& operator[](const char* key) {
        auto it = index.find(key);
        if (it != index.end()) {
            // Key exists, move it to the front and return the value
            data.splice(data.begin(), data, it->second);
            return it->second->value;
        } else {
            // Key does not exist, insert a new entry at the front
            data.push_front({ key, E{} });
            index[key] = data.begin();
            return data.front().value;
        }
	}

    void forEachValue(void (*func)(const E&)) const {
        for (const auto& entry : data) {
            func(entry.value);
        }
    }
};

void testQ1API() { // ============ do not change ===============
	Map<Student> map;
	map.put("A", Student('A', 25));
	map.put("B", Student('B', 22));
	map.put("C", Student('C', 26));

	map.forEachValue([](const Student& s) {
		cout << s.getName();
	});
	cout << endl; // expected output: CBA

	cout << map["B"].getAge() << endl; // expected output: 22

	map.forEachValue([](const Student& s) {
		cout << s.getName();
	});
	cout << endl; // expected output: BCA

	map["B"].setAge(27);
	cout << map["B"].getAge() << endl; // expected output: 27

	try {
		cout << map["D"].getAge() << endl; // throws exception
	}
	catch (const char* msg) {
		cout << msg << endl; // "key not found"
	}
}

//#endif