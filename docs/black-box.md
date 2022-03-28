# Black Box Testing Documentation

## Endpoint `/identity/:amount`

> Description:
> Takes in the `amount` path parameter and returns `amount` of identity objects.\
> The `amount` can range from `2` to `100`.

### Partitions:

- Valid Partitions: 
  - `2 to 100`
- Invalid Partitions:
  - `<2`
  - `>100`
  - `Characters`

###  Boundary Value Analysis:

| Partition | Invalid Lower Boundary | Valid Lower Boundary | Invalid Upper Boundary | Valid Upper Boundary |
|-----------|------------------------|----------------------|------------------------|----------------------|
| `2 to 100`| `1`                    | `2`                  | `101`                  | `100`                |

### Test Cases: `10`, `2`, `100`, `101`, `1`, `thisIsNotNumber`


